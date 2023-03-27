import AceEditor from "react-ace";
import "ace-builds/src-noconflict/ace";
import "ace-builds/src-noconflict/mode-python";

// import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/theme-solarized_dark";
// import "ace-builds/src-noconflict/theme-tomorrow_night_blue";
import { useEffect, useState } from "react";
import CodingHeader from "../components/coding_panel/coding_header";
import MyFiles from "../components/coding_panel/my_files";
import UseHttp from "../hooks/http-hook";
import { useNavigate } from "react-router-dom";
const CodingPage = () => {
  const navigate = useNavigate()
  const [showFiles, setShowFiles] = useState(true);
  const [code, setCode] = useState("");
  const [file_name, setFileName] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [output, setOutput] = useState("");
  const [token,setToken] = useState(null)
  useEffect(()=>{
    const myToken = localStorage.getItem("token");
    if (!myToken) {
      navigate("/login")
    }
    else{
      setToken(myToken)
    }
  },[])

  const toggleShowMyFiles = () => {
    console.log(showFiles);
    setShowFiles(!showFiles);
  };

  const saveHandler = async () => {
    // const formData = new FormData();
    // formData.append("code", code);
    // formData.append("file_name", file_name);
    // console.log(file_name);
    // const data = await UseHttp("save_file", "POST", formData, {
    //   Authorization:
    //     "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vMTI3LjAuMC4xOjgwMDAvYXBpL3YxL2xvZ2luIiwiaWF0IjoxNjc5ODc4OTU4LCJleHAiOjE2Nzk4ODI1NTgsIm5iZiI6MTY3OTg3ODk1OCwianRpIjoiQmgwNm8zYXBhU0x3cFdmVSIsInN1YiI6IjEiLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.VfGayW19C0oPuS6QQsu50WskTKAQowYhaAqdM2A1AWc",
    // });
    // setIsSaving(!isSaving);
    // console.log(isSaving);
  };
  const runHandler = async () => {
      const formData = new FormData();
    formData.append("code", code);
    const data = await UseHttp("output", "POST", formData, {
      Authorization:
        "Bearer"+ token,
    });
    setOutput(data.output);
 
  };
  const savingclassNameHandler = (value) => {
    setFileName(value);
    setIsSaving(false);
  };
  const codeHandler = (value) => {
    setCode(value);
  };

  const fileNameChangleHandler = (e) => {
    console.log(e.target.value);
  };
  return (
    <>
      <CodingHeader
        onSave={saveHandler}
        onshowfiles={toggleShowMyFiles}
        onRun={runHandler}
        onSaveClassName={savingclassNameHandler}
        isSaving={isSaving}
        onChange={fileNameChangleHandler}
      />
      <div className="code">
        <AceEditor
          placeholder="Start Coding... "
          mode="python"
          width="100%"
          height="100%"
          theme="solarized_dark"
          fontSize={20}
          showPrintMargin={true}
          showGutter={true}
          highlightActiveLine={true}
          value={code}
          onChange={codeHandler}
          setOptions={{
            showLineNumbers: true,
            tabSize: 4,
          }}
        />
        <div className="console">
          {showFiles ? (
            <MyFiles />
          ) : (
            <div>
              <label>
                {" "}
                {`->`}output :<br />
              </label>
              <label>{output}</label>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default CodingPage;
