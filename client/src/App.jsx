import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

function App() {
  const [inp, setInp] = useState("");

  const handleShorten = async (e) => {
    e.preventDefault();
    try {
      if (inp.length === 0) {
        return;
      }

      const response = await fetch("http://localhost:3131/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          full: inp,
        }),
      });

      if (!response.ok) {
        toast.error("Something Went Wrong");
        return;
      }

      const data = await response.json();
      setInp(`http://localhost:3131/${data.shortUrl}`);
      toast.success(data.message ? data.message : "Done");
    } catch (error) {
      console.error("Error:", error);
      toast.error("Something Went Wrong");
    }
  };

  const handleCopy = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText(inp).then(
      () => {
        console.log("Text copied to clipboard");
        toast.success("Text copied to clipboard");
      },
      (err) => {
        console.error("Failed to copy text: ", err);
        toast.error("Failed to copy text");
      }
    );
  };

  return (
    <>
      <div className="row mx-sm-3 my-5">
        <div className="col-3"></div>
        <div className="col-6" id="container">
          <h1 className="text-center my-4" id="top">
            <i>Tinga URL</i>
          </h1>
          <form className="form-inline">
            <div className="form-group mx-sm-3 mb-2">
              <input
                type="text"
                className="form-control"
                id="inp"
                placeholder="Enter URL"
                value={inp}
                onChange={(e) => setInp(e.target.value)}
              />
            </div>
            <button
              type="button"
              className="btn btn-primary mb-2 mx-2"
              id="shorten"
              onClick={handleShorten}
            >
              SHORTEN
            </button>
            <button
              type="button"
              className="btn btn-warning mb-2 mx-2"
              id="copy"
              onClick={handleCopy}
            >
              COPY
            </button>
          </form>
        </div>
        <div className="col-3"></div>
      </div>
      <Toaster />
    </>
  );
}

export default App;
