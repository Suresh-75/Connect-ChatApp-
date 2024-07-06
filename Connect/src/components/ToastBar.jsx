function ToastBar({ msg, setErr }) {
  return (
    <div
      id="toast-default"
      className="flex items-center w-full max-w-xs p-4 text-gray-500 bg-white absolute top-[5%] left-[40%] rounded-lg shadow dark:text-gray-400 dark:bg-gray-800"
      role="alert"
    >
      <div className="inline-flex items-center justify-center flex-shrink-0 w-10 h-10 text-violet-500 bg-violet-100 rounded-lg dark:bg-violet-800 dark:text-violet-200">
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          height="1.4rem"
          width="1.4rem"
        >
          <path d="M12.884 2.532c-.346-.654-1.422-.654-1.768 0l-9 17A.999.999 0 003 21h18a.998.998 0 00.883-1.467L12.884 2.532zM13 18h-2v-2h2v2zm-2-4V9h2l.001 5H11z" />
        </svg>
      </div>
      <div className="ms-3 text-sm font-bold">{msg}</div>
      <button
        type="button"
        className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
        data-dismiss-target="#toast-default"
        aria-label="Close"
        onClick={() => setErr("")}
      >
        <span className="sr-only">Close</span>
        <svg
          className="w-3 h-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 14"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
          />
        </svg>
      </button>
    </div>
  );
}

export default ToastBar;
