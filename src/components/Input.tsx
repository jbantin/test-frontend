import { useContext, useState } from "react";
import { LogContext } from "./LogContext";

const Input = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [data, setData] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const contextData = useContext(LogContext);
  function submitHandler(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    if (inputValue === "") return;
    const fetchPrompt = async (prompt: string) => {
      setLoading(true);
      const response = await fetch(
        "https://express-backend-delta.vercel.app/prompt",
        {
          headers: { "content-type": "application/json" },
          method: "POST",
          body: JSON.stringify({
            prompt: prompt,
            token: contextData?.authToken,
          }),
        }
      );
      const newData: string = await response.text();
      setData(newData);
      setLoading(false);
    };
    fetchPrompt(inputValue);
    return;
  }
  return (
    <>
      <div className="w-full h-screen bg-black px-2 sm:px-12 md:px-24 xl:px-48">
        <div className=" mx-auto">
          <h1 className="text-4xl font-bold py-4 text-white">AskOhMatic</h1>
        </div>

        <form
          onSubmit={submitHandler}
          className="form w-full  mx-auto flex flex-col bg-black rounded-md"
        >
          <h2 className="text-2xl font-bold text-white"> Enter Question</h2>
          <input
            className="w-[80%] rounded-md p-3 mt-1  bg-xclr1 text-white"
            type="text"
            id="inputText"
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
            }}
            placeholder="ask somethng"
          />
          <button
            type="submit"
            className="rounded-md mt-4 mb-2 w-32 h-12 bg-xclr5 hover:bg-xclr3 text-black hover:text-xclr5 text-xl font-bold"
          >
            submit
          </button>
        </form>
        <div className="mx-auto h-3/5  bg-xclr2 text-white mt-2 rounded-lg p-4 overflow-auto">
          {loading ? <h2>loading...</h2> : <></>}
          {data ? <h3>{data}</h3> : <></>}
        </div>
      </div>
    </>
  );
};

export default Input;
