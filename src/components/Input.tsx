import { useContext, useState } from "react";
import { LogContext } from "./LogContext";
import ReactMarkdown from "react-markdown";

const Input = () => {
  const [inputValue, setInputValue] = useState<string>("");
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

      const newChatDate = {
        q: inputValue,
        a: newData,
      };
      contextData?.userChatData.push(newChatDate);
      await fetch(
        "https://express-backend-delta.vercel.app/update_data",
        {
          headers: { "content-type": "application/json" },
          method: "POST",
          body: JSON.stringify({
            data: contextData?.userChatData,
            token: contextData?.authToken,
          }),
        }
      );
          setLoading(false);
    };
    fetchPrompt(inputValue);
    return;
  }
  return (
    <>
      <div className=" w-full h-screen bg-black px-2 sm:px-12 md:px-24 xl:px-48">
        <div className="text-1xl sm:text-2xl md:text-3xl xl:text-4xl flex justify-between">
          <h1 className="font-bold py-4 text-white">AskOhMatic</h1>
          <h1 className="font-bold py-4 text-white">
            Hey {contextData?.userName}
          </h1>
        </div>

        <form
          onSubmit={submitHandler}
          className="form w-full  mx-auto flex flex-col bg-black rounded-md"
        >
          <h2 className="text-2xl font-bold text-white"> Enter Question</h2>
          <input
            className="w-[80%] rounded-md p-3 mt-1  bg-xclr4 text-black focus:outline-none"
            type="text"
            id="inputText"
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
            }}
            placeholder="ask something"
          />
          {loading?<button className="rounded-md mt-4 mb-2 w-32 h-12 bg-xclr5 text-black text-xl font-bold">Loading...</button>:<button
            type="submit"
            className="rounded-md mt-4 mb-2 w-32 h-12 bg-xclr5 hover:bg-xclr3 text-black text-xl font-bold"
          >
            submit
          </button>}
          
        </form>
        <div className="mx-auto h-3/4  bg-xclr2 font-bold mt-2 rounded-lg p-4 text-black overflow-auto">
                  {contextData?.userChatData.map((data,i) => (
            <div key={i}>
               <p className="bg-xclr3 rounded-lg p-2 inline">
              {data.q}
            </p>
            <ReactMarkdown className="bg-xclr4 rounded-lg p-2 my-2">{data.a}</ReactMarkdown>
            </div>
           
          ))}
          
        </div>
      </div>
    </>
  );
};

export default Input;
