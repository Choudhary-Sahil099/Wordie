import { useEffect, useState } from "react";

// updates needed :-->
//1. after every trie has beem used the message you loose will appear
//2. adding a screen keyboard
//3.Add play again button

const App = () => {
  const [word, setWord] = useState(null);
  //here the length:5 represent the 5 rows and the Array(5).fill("") function represents the 5 column
  const [grid, setGrid] = useState(
    Array.from({ length: 5 }, () => Array(5).fill("")),
  );
  const [currentRow, setCurrentRow] = useState(0);
  const [currentCol, setCurrentCol] = useState(0);
  const [lockedRows, setLockedRows] = useState(Array(5).fill(false));
  const [revealed, setRevealed] = useState(Array(5).fill(false));

  const [colors, setColors] = useState(
    Array.from({ length: 5 }, () => Array(5).fill("")),
  );
  const [gameOver, setGameOver] = useState(false);
  const [message, setMessage] = useState(false);

  useEffect(() => {
    async function fetchWord() {
      const res = await fetch("https://api.datamuse.com/words?sp=?????");
      const data = await res.json();
      const newWord =
        data[Math.floor(Math.random() * data.length)].word.toUpperCase();
      setWord(newWord);
    }

    fetchWord();
  }, []);
  useEffect(() => {
    if (gameOver) return;
    const handleKeyDown = (e) => {
      // LETTER INPUT
      if (
        e.key.length === 1 &&
        e.key >= "a" &&
        e.key <= "z" &&
        currentCol < 5
      ) {
        const letter = e.key.toUpperCase();

        setGrid((prev) =>
          prev.map((row, rowIdx) =>
            rowIdx === currentRow
              ? row.map((cell, colIdx) =>
                  colIdx === currentCol ? letter : cell,
                )
              : row,
          ),
        );

        setCurrentCol((prev) => prev + 1);
      }

      // BACKSPACE
      if (e.key === "Backspace" && currentCol > 0) {
        setGrid((prev) =>
          prev.map((row, rowIdx) =>
            rowIdx === currentRow
              ? row.map((cell, colIdx) =>
                  colIdx === currentCol - 1 ? "" : cell,
                )
              : row,
          ),
        );

        setCurrentCol((prev) => prev - 1);
      }

      if (e.key === "Enter" && currentCol == 5) {
        const guess = grid[currentRow].join("");
        const wordArray = word.split("");
        const newRevealed = [...revealed];
        const rowColor = Array(5).fill("bg-gray-400");

        for (let i = 0; i < 5; i++) {
          if (guess[i] === wordArray[i]) {
            rowColor[i] = "bg-green-500";
            wordArray[i] = null;
            newRevealed[i] = true;
          }
        }
        for (let i = 0; i < 5; i++) {
          if (rowColor[i] == "bg-green-500") continue;
          const index = wordArray.indexOf(guess[i]);
          if (index !== -1) {
            rowColor[i] = "bg-yellow-400";
            wordArray[index] = null;
          }
        }
        setRevealed(newRevealed);
        setColors((prev) =>
          prev.map((row, rIdx) => (rIdx === currentRow ? rowColor : row)),
        );

        setLockedRows((prev) => {
          const copy = [...prev];
          copy[currentRow] = true;
          return copy;
        });

        if (guess === word) {
          setMessage("You Win!!");
          setGameOver(true);



          setLockedRows((prev) => {
            const copy = [...prev];
            copy[currentRow] = true;
            return copy;
          });

          return;
        }

        setLockedRows((prev) => {
          const copy = [...prev];
          copy[currentRow] = true;
          return copy;
        });

        if(currentRow === 4){
          setMessage("You Loose 💔");
          setRevealed(Array(5).fill(true));
          setGameOver(true);
        }
        setCurrentRow((prev) => prev + 1);
        setCurrentCol(0);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentRow, currentCol]);
  

  if (!word) {
    return <h2>Loading...</h2>;
  }


  return (
    <>
    {/* //checking if the api is working correctly (can be updated later) */}
      <div className="flex flex-col gap-10">
        <h2 className="text-2xl text-center">Word Loaded</h2>

        <div className="flex gap-10 items-center justify-center">
          {word.split("").map((l, i) => (
            <span
              className="h-13 w-13 border-1 flex justify-center items-center gap-10 rounded-xl text-xl font-medium hidden-Text "
              key={i}
            >
              {revealed[i] ? l : "-"}
            </span>
          ))}
        </div>
      </div>
      <div className="h-100 flex flex-col mt-10 justify-center items-center gap-5">
        <h1 className="text-2xl">Guess</h1>
        <div className="space-y-3">
          {grid.map((row, rowIdx) => (
            <div key={rowIdx} className="flex gap-3">
              {row.map((cell, colIdx) => (
                <div
                  key={colIdx}
                  className={`w-14 h-14 border-2 border-gray-400 
                           flex items-center justify-center
                           text-2xl font-bold uppercase 
                           ${colors[rowIdx][colIdx]}`}
                >
                  {cell}
                </div>
              ))}
            </div>
          ))}
        </div>
        {message && (
          <p className="text-xl font-bold text-green-600 mt-4">{message}</p>
        )}
      </div>
    </>
  );
};

export default App;
