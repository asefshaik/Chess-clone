import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaFire,
  FaRegHandshake,
  FaRobot,
  FaChessPawn,
  FaTimes
} from "react-icons/fa";
import "../component-styles/GameInfo.css";

const GameInfo = ({ streak = 0 }) => {
  const navigate = useNavigate();
  const [isSearching, setIsSearching] = useState(false);
  const [searchTime, setSearchTime] = useState(0);

  const pollingIntervalRef = useRef(null);
  const searchTimerRef = useRef(null);

  useEffect(() => {
    return () => {
      clearInterval(pollingIntervalRef.current);
      clearTimeout(searchTimerRef.current);
    };
  }, []);

  const cancelSearch = async () => {
    clearInterval(pollingIntervalRef.current);
    clearTimeout(searchTimerRef.current);
    pollingIntervalRef.current = null;
    searchTimerRef.current = null;

    try {
      await fetch("http://localhost:8080/game/cancel-waiting", {
        method: "POST",
        credentials: "include",
      });
    } catch (e) {
      console.error("Cancel error:", e);
    }

    setIsSearching(false);
    setSearchTime(0);
  };

  const pollForMatch = () => {
    pollingIntervalRef.current = setInterval(async () => {
      setSearchTime(prev => prev + 1);

      try {
        const res = await fetch("http://localhost:8080/game/check-match", {
          credentials: "include",
        });

        if (!res.ok) return;

        const data = await res.json();
        console.log("Polling response:", data);

        const matchId = data.matchId ?? data.id;
        if (matchId && matchId > 0) {
          cancelSearch();
          navigate(`/game/${matchId}`);
        }
      } catch (e) {
        console.error("Polling error:", e);
      }
    }, 1000);
  };

  const createNewGame = async () => {
    if (isSearching) {
      cancelSearch();
      return;
    }

    setIsSearching(true);
    setSearchTime(0);

    try {
      const res = await fetch("http://localhost:8080/game", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) {
        alert("Unauthorized or server error");
        setIsSearching(false);
        return;
      }

      const data = await res.json();
      console.log("Create game response:", data);

      const matchId = data.matchId ?? data.id;

      if (matchId === -1) {
        pollForMatch();
        searchTimerRef.current = setTimeout(() => {
          cancelSearch();
          alert("No opponent found");
        }, 90000);
      } else if (matchId > 0) {
        setIsSearching(false);
        navigate(`/game/${matchId}`);
      } else {
        setIsSearching(false);
        alert("Could not start game");
      }
    } catch (e) {
      console.error("Create game error:", e);
      setIsSearching(false);
    }
  };

  return (
    <div className="game-info">
      <div className="streak">
        <FaFire size={30} />
        <div>
          <p>Streak</p>
          <h3>{streak} Days</h3>
        </div>
      </div>

      <div className="buttons">
        <button className="button">
          <FaChessPawn size={20} />
          Play 1 | 1
        </button>

        <button
          className={`button ${isSearching ? "searching" : ""}`}
          onClick={createNewGame}
        >
          {isSearching ? (
            <>
              <FaTimes /> Cancel ({searchTime}s)
            </>
          ) : (
            <>
              <FaChessPawn /> New Game
            </>
          )}
        </button>

        <button className="button">
          <FaRobot size={20} />
          Play Bots
        </button>

        <button className="button">
          <FaRegHandshake size={20} />
          Play a Friend
        </button>
      </div>
    </div>
  );
};

export default GameInfo;
