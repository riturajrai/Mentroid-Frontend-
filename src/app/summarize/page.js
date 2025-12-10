"use client";
import { useState } from "react";
import { UploadCloud, Trash2, FileText, ArrowLeft, FileCheck, Loader2, Type } from "lucide-react";

/* --------------------------------------------------
   Upload Screen Component
-------------------------------------------------- */
function SummarizerScreen({ setActive, setFileData, setTextInput }) {
  const [files, setFiles] = useState([]);
  const [textContent, setTextContent] = useState("");
  const [inputMode, setInputMode] = useState("file"); // file | text

  const handleFileUpload = (event) => {
    const uploadedFiles = Array.from(event.target.files);
    const fileList = uploadedFiles.map((file) => ({
      name: file.name,
      size: file.size,
      file: file,
      status: "uploading",
    }));

    setFiles((prev) => [...prev, ...fileList]);

    setTimeout(() => {
      setFiles((prev) =>
        prev.map((f) =>
          fileList.some((uf) => uf.name === f.name)
            ? { ...f, status: "completed" }
            : f
        )
      );
    }, 1500);
  };

  const removeFile = (name) => {
    setFiles((prev) => prev.filter((f) => f.name !== name));
  };

  const handleGetStarted = () => {
    if (inputMode === "file") {
      const completedFiles = files.filter((f) => f.status === "completed");

      if (completedFiles.length === 0) {
        alert("Upload at least one file to continue.");
        return;
      }

      setFileData(completedFiles[0]);
      setTextInput(null);
    } else {
      if (!textContent.trim()) {
        alert("Enter some text to summarize.");
        return;
      }

      setTextInput(textContent);
      setFileData(null);
    }

    setActive("summarizeView");
  };

  const hasCompletedFiles = files.some((f) => f.status === "completed");
  const canProceed =
    inputMode === "file" ? hasCompletedFiles : textContent.trim().length > 0;

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#F8CEFC] to-[#D6E3FF] flex flex-col md:flex-row items-center justify-center gap-10 px-4 sm:px-6 py-8 md:p-10">

      <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-5 w-full md:w-[40%]">
        <h1 className="text-4xl font-extrabold text-gray-800">Summarizer Note</h1>
        <p className="text-gray-600 text-base max-w-sm">
          Upload your notes, lectures, or PDFs — or paste text — and get summaries instantly.
        </p>

        <button
          className={`px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full shadow-lg hover:scale-105 transition ${
            !canProceed ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={handleGetStarted}
          disabled={!canProceed}
        >
          Get Started
        </button>
      </div>

      {/* RIGHT SIDE: FILE / TEXT INPUT */}
      <div className="w-full md:w-[60%] bg-white rounded-[30px] shadow-xl p-8 border">

        {/* Toggle */}
        <div className="flex gap-3 mb-6">
          <button
            onClick={() => setInputMode("file")}
            className={`flex-1 py-3 rounded-xl font-semibold ${
              inputMode === "file"
                ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <UploadCloud /> Upload File
            </div>
          </button>

          <button
            onClick={() => setInputMode("text")}
            className={`flex-1 py-3 rounded-xl font-semibold ${
              inputMode === "text"
                ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <Type /> Enter Text
            </div>
          </button>
        </div>

        {/* FILE MODE */}
        {inputMode === "file" ? (
          <>
            <h2 className="text-2xl font-bold mb-5">Upload File</h2>

            <div className="bg-[#F8CEFC] rounded-3xl p-8 border">

              <div className="text-center border-2 border-dashed border-pink-300 rounded-2xl p-10 bg-pink-50">
                <UploadCloud className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                <p className="font-semibold text-gray-700">Choose or drag file</p>
                <p className="text-sm text-gray-500 mb-4">JPG, PNG, PDF up to 50MB</p>

                <label className="px-5 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full shadow-md cursor-pointer hover:opacity-90">
                  Browse File
                  <input
                    type="file"
                    multiple
                    className="hidden"
                    onChange={handleFileUpload}
                    accept=".pdf,.png,.jpg,.jpeg"
                  />
                </label>
              </div>

              {/* Uploaded File List */}
              <div className="mt-6 space-y-3">
                {files.map((file) => (
                  <div
                    key={file.name}
                    className={`flex items-center justify-between p-4 rounded-2xl ${
                      file.status === "completed"
                        ? "bg-green-200"
                        : "bg-green-100 animate-pulse"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <FileText className="text-green-800 w-6 h-6" />
                      <div>
                        <p className="font-medium">{file.name}</p>
                        <p className="text-xs text-gray-600">
                          {Math.round(file.size / 1024)} KB • {file.status}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => removeFile(file.name)}
                      className="p-2 hover:bg-red-200 rounded-full"
                    >
                      <Trash2 className="text-red-600" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <>
            {/* TEXT MODE */}
            <h2 className="text-2xl font-bold mb-5">Enter Text</h2>

            <div className="bg-[#F8CEFC] rounded-3xl p-8 border">
              <textarea
                value={textContent}
                onChange={(e) => setTextContent(e.target.value)}
                placeholder="Paste or type your text here..."
                className="w-full h-64 p-4 bg-white rounded-xl border-2 border-pink-200 focus:border-purple-400 resize-none"
              />

              <div className="mt-3 flex justify-between text-sm">
                <span>{textContent.length} characters</span>
                {textContent.length > 0 && (
                  <button
                    onClick={() => setTextContent("")}
                    className="text-red-600 hover:text-red-700"
                  >
                    Clear Text
                  </button>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

/* --------------------------------------------------
   SUMMARY VIEW COMPONENT
-------------------------------------------------- */
function SummarizeView({ fileData, textInput, setActive }) {
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [summaryType, setSummaryType] = useState("detailed");
  const [board, setBoard] = useState("CBSE");
  const [subject, setSubject] = useState("General");
  const [className, setClassName] = useState("12");

  const handleGenerateSummary = async () => {
    if (!fileData && !textInput) {
      alert("Provide text or file to summarize.");
      return;
    }

    if (textInput?.trim().length > 0 && textInput.trim().length < 20) {
      alert("Text must be at least 20 characters.");
      return;
    }

    setLoading(true);
    try {
      /* ------------------------------
         BUILD PAYLOAD FOR BACKEND
      ------------------------------ */
      let payload = {
        board,
        subject,
        summary_type: summaryType,
        class_name: className,
        user_info: {
          grade: className,
          learning_style: "visual",
        },
      };

      // TEXT
      if (textInput?.trim()) {
        payload.topic = textInput.trim();
      }

      // FILE
      if (fileData?.file) {
        const file = fileData.file;

        const base64 = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = (e) => resolve(e.target.result.split(",")[1]);
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });

        payload.file_base64 = base64;
        payload.filename = file.name;
      }

      // FINAL VALIDATION
      if (!payload.topic && !payload.file_base64) {
        setLoading(false);
        alert("You must provide either a text topic or a file.");
        return;
      }

      /* ------------------------------
         SEND REQUEST TO API ROUTE
      ------------------------------ */
      const response = await fetch("/api/summarizer", {
        method: "POST",
        body: JSON.stringify(payload),
        headers: { "Content-Type": "application/json" },
      });

      const resultText = await response.text();
      const data = JSON.parse(resultText);

      if (!response.ok) {
        throw new Error(data.error || "Summary generation failed.");
      }

      setSummary(data.summary || "No summary returned.");
    } catch (error) {
      setSummary("Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F8CEFC] to-[#D6E3FF] p-8">

      <button
        onClick={() => setActive("summarizer")}
        className="mb-6 flex items-center gap-2 text-gray-700 hover:text-gray-900"
      >
        <ArrowLeft /> Back to Upload
      </button>

      <div className="bg-white rounded-3xl shadow-xl p-10 border">

        <h1 className="text-3xl font-extrabold mb-6">Document Summary</h1>

        {/* FILE PREVIEW */}
        {fileData && (
          <div className="bg-purple-100 p-5 rounded-2xl mb-6 flex items-center gap-4">
            <FileCheck className="text-purple-600 w-8 h-8" />
            <div>
              <p className="font-semibold">{fileData.name}</p>
              <p className="text-sm">{Math.round(fileData.size / 1024)} KB</p>
            </div>
          </div>
        )}

        {/* TEXT PREVIEW */}
        {textInput && (
          <div className="bg-purple-100 p-5 rounded-2xl mb-6">
            <p className="text-sm text-gray-700 whitespace-pre-wrap max-h-40 overflow-y-auto">
              {textInput}
            </p>
          </div>
        )}

        {/* SUMMARY SETTINGS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div>
            <label>Summary Type</label>
            <select
              value={summaryType}
              onChange={(e) => setSummaryType(e.target.value)}
              className="w-full mt-1 px-4 py-2 border rounded-xl"
            >
              <option value="brief">Brief</option>
              <option value="detailed">Detailed</option>
              <option value="exam_focused">Exam Focused</option>
              <option value="concept_map">Concept Map</option>
            </select>
          </div>

          <div>
            <label>Board</label>
            <select
              value={board}
              onChange={(e) => setBoard(e.target.value)}
              className="w-full mt-1 px-4 py-2 border rounded-xl"
            >
              <option>CBSE</option>
              <option>ICSE</option>
              <option>State Board</option>
            </select>
          </div>

          <div>
            <label>Subject</label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full mt-1 px-4 py-2 border rounded-xl"
            />
          </div>

          <div>
            <label>Class</label>
            <select
              value={className}
              onChange={(e) => setClassName(e.target.value)}
              className="w-full mt-1 px-4 py-2 border rounded-xl"
            >
              <option>9</option>
              <option>10</option>
              <option>11</option>
              <option>12</option>
            </select>
          </div>
        </div>

        {/* GENERATE BUTTON */}
        <button
          onClick={handleGenerateSummary}
          disabled={loading}
          className={`px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full shadow-lg ${
            loading ? "opacity-50 cursor-not-allowed" : "hover:scale-105"
          }`}
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <Loader2 className="animate-spin" /> Generating Summary...
            </span>
          ) : (
            "Generate Summary"
          )}
        </button>

        {/* SUMMARY DISPLAY */}
        {summary && (
          <div className="bg-purple-50 mt-8 p-6 rounded-2xl">
            <h2 className="text-xl font-bold mb-3">Summary Output:</h2>
            <p className="whitespace-pre-wrap text-gray-700">{summary}</p>
          </div>
        )}
      </div>
    </div>
  );
}

/* --------------------------------------------------
   MAIN APP EXPORT
-------------------------------------------------- */
export default function App() {
  const [activeScreen, setActiveScreen] = useState("summarizer");
  const [fileData, setFileData] = useState(null);
  const [textInput, setTextInput] = useState(null);

  return (
    <div className="w-full min-h-screen">
      {activeScreen === "summarizer" ? (
        <SummarizerScreen
          setActive={setActiveScreen}
          setFileData={setFileData}
          setTextInput={setTextInput}
        />
      ) : (
        <SummarizeView
          fileData={fileData}
          textInput={textInput}
          setActive={setActiveScreen}
        />
      )}
    </div>
  );
}
