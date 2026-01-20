import React, { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

// Core Components
import Header from "../components/Header";
import SideNav from "../components/SideNav";
import GameContainer from "../components/game-page-components/GameContainer";


const useGameSession = (matchId) => {
  const [state, setState] = useState({
    data: null,
    stompClient: null,
    error: null,
    loading: true,
  });

  useEffect(() => {
    const fetchGame = async () => {
      try {
        const response = await fetch(`http://localhost:8080/game/${matchId}`, {
          credentials: "include",
        });
        if (!response.ok) throw new Error("Game session not found");
        
        const data = await response.json();
        setState(prev => ({ ...prev, data, loading: false }));
      } catch (err) {
        setState(prev => ({ ...prev, error: err.message, loading: false }));
      }
    };

    fetchGame();
  }, [matchId]);

  useEffect(() => {
    const socket = new SockJS("http://localhost:8080/ws");
    const client = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
      onConnect: () => {
        client.subscribe(`/topic/game/${matchId}`, (message) => {
          const update = JSON.parse(message.body);
          setState(prev => ({ 
            ...prev, 
            data: { ...prev.data, ...update } 
          }));
        });
      },
    });

    client.activate();
    setState(prev => ({ ...prev, stompClient: client }));

    return () => client.deactivate();
  }, [matchId]);

  return state;
};


const Game = () => {
  const { matchId } = useParams();
  const { data, stompClient, error, loading } = useGameSession(matchId);

  const playerColor = useMemo(() => data?.playerColor || "white", [data]);

  if (error) return <StatusScreen message={error} type="error" />;
  if (loading) return <StatusScreen message="Loading game..." type="loading" />;

  return (
    <main className="app-container">
      <SideNav />
      <section className="main-container">
        <Header />
        <GameContainer
          matchId={matchId}
          stompClient={stompClient}
          playerColor={playerColor}
          initialGameData={data}
        />
      </section>
    </main>
  );
};

const StatusScreen = ({ message, type }) => (
  <div className={`status-display ${type}`}>
    <p>{message}</p>
  </div>
);

export default Game;