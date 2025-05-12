body {
  margin: 0;
  font-family: 'Segoe UI', sans-serif;
  background-color: #fff8f0;
  text-align: center;
  padding: 20px;
}

h1 {
  font-size: 1.8em;
  color: #d35400;
}

.container {
  max-width: 400px;
  margin: auto;
}

.choices {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 10px;
  margin-top: 20px;
}

.pizza {
  background-color: #f39c12;
  flex: 1;
  padding: 20px;
  border-radius: 12px;
  color: white;
  font-weight: bold;
  cursor: pointer;
  transition: transform 0.2s ease, background-color 0.2s ease;
}

.pizza:hover {
  background-color: #e67e22;
  transform: scale(1.05);
}

#round-info {
  margin-top: 10px;
  font-size: 1.2em;
  color: #555;
}

#winner {
  margin-top: 30px;
  font-size: 1.5em;
  font-weight: bold;
  color: #27ae60;
}

.hidden {
  display: none;
}

@media (max-width: 480px) {
  .choices {
    flex-direction: column;
  }
}
