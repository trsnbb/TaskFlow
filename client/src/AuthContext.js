import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "./axios";
import { useDispatch } from "react-redux";
import { fetchProject } from "../src/slices/project";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const dispatch = useDispatch();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [friends, setFriends] = useState([]);
    const [activeChat, setActiveChat] = useState(null); 

    const login = async (loginData) => {
        try {
            const response = await axios.post("/login", loginData);
            const userData = response.data;
            setUser(userData);
            setIsAuthenticated(true);
            localStorage.setItem("authToken", response.data.token);
            localStorage.setItem("user", JSON.stringify(userData)); 
            await fetchFriends(); 
            return userData;
        } catch (error) {
            console.error("Login error:", error);
            throw error;
        }
    };

    const logout = () => {
        setIsAuthenticated(false);
        setUser(null);
        setFriends([]);
        setActiveChat(null); 
        localStorage.removeItem("user");
        localStorage.removeItem("authToken");
        dispatch(fetchProject());
    };

    const fetchFriends = async () => {
        try {
            const response = await axios.get("/friends");
            setFriends(response.data.friends);
        } catch (error) {
            console.error("Failed to fetch friends:", error);
        }
    };

    const deleteFriend = async (friendId) => {
        try {
          const response = await axios.delete(`/friends`, { data: { friendId } });
          if (response.data.success) {
            setFriends(friends.filter(friend => friend._id !== friendId));
          }
        } catch (error) {
          console.error("Failed to delete friend:", error);
        }
      };

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        const token = localStorage.getItem("authToken");
        if (storedUser && token) {
            const userData = JSON.parse(storedUser);
            setUser(userData);
            setIsAuthenticated(true);
            fetchFriends(); 
        }
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, friends, activeChat, setActiveChat, login, logout, deleteFriend }}>
            {children}
        </AuthContext.Provider>
    );
};
