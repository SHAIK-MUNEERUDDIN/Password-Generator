import { useState, useCallback, useEffect, useRef } from "react";

function App() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*()_+-={}[]|\\:;\"'<>,.?/~`";

    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, charAllowed, numberAllowed, setPassword]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);

  const copyPassword = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 256);
    window.navigator.clipboard.writeText(password);
  }, [password]);

  return (
    <div className="h-svh w-screen bg-black absolute ">
      <div className="w-full max-w-md mx-auto my-12 px-4 py-4 shadow-md rounded-md bg-gray-800 font-semibold text-orange-500 ">
        <h1 className="text-3xl my-3 font-bold text-center text-white">
          Password Generator
        </h1>

        <div className="flex shadow rounded-lg overflow-hidden mb-3">
          <input
            type="text"
            className="outline-none w-full py-1 px-3"
            value={password}
            placeholder="Password"
            readOnly
            ref={passwordRef}
          />
          <button
            className="outline-none text-white bg-green-900 px-3 py-0.5 shrink-0"
            onClick={copyPassword}
          >
            copy
          </button>
        </div>

        <div className="flex gap-3">
          <div className="flex item-center gap-2">
            <input
              type="range"
              min={8}
              max={256}
              value={length}
              className="cursor-pointer"
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label>Length:{length}</label>
          </div>

          <div className="flex item-center gap-2">
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              onChange={() => setNumberAllowed((prev) => !prev)}
            />
            <label>Numbers</label>
          </div>

          <div className="flex item-center gap-2">
            <input
              type="checkbox"
              defaultChecked={charAllowed}
              onChange={() => setCharAllowed((prev) => !prev)}
            />
            <label>Characters</label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
