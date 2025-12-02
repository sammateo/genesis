import Header from "@/app/components/header/header";

const page = () => {
  return (
    <div>
      <Header />
      <form
        action="#"
        className="mx-auto max-w-md space-y-4 rounded-lg border border-gray-300 bg-gray-100 p-6"
      >
        <div>
          <h1 className="text-center font-medium text-2xl mb-5">
            Create a New Match
          </h1>
          <label
            className="block text-sm font-medium text-gray-900"
            htmlFor="name"
          >
            Name
          </label>

          <input
            className="mt-1 w-full rounded-lg border-2 border-gray-300 focus:border-indigo-500 focus:outline-none bg-white px-4 py-2"
            id="name"
            type="text"
            placeholder="Your name"
          />
        </div>

        <div>
          <label
            className="block text-sm font-medium text-gray-900"
            htmlFor="email"
          >
            Email
          </label>

          <input
            className="mt-1 w-full rounded-lg border-2 border-gray-300 focus:border-indigo-500 focus:outline-none bg-white px-4 py-2"
            id="email"
            type="email"
            placeholder="Your email"
          />
        </div>

        <div>
          <label
            className="block text-sm font-medium text-gray-900"
            htmlFor="subject"
          >
            Subject
          </label>

          <select
            className="mt-1 w-full rounded-lg border-2 border-gray-300 focus:border-indigo-500 focus:outline-none bg-white px-4 py-2"
            id="subject"
          >
            <option value="">Select a subject</option>
            <option value="general-inquiry">General Inquiry</option>
            <option value="support">Support</option>
            <option value="feedback">Feedback</option>
          </select>
        </div>

        <div>
          <label
            className="block text-sm font-medium text-gray-900"
            htmlFor="priority"
          >
            Priority
          </label>

          <select
            className="mt-1 w-full rounded-lg border-2 border-gray-300 focus:border-indigo-500 focus:outline-none bg-white px-4 py-2"
            id="priority"
          >
            <option value="">Select a priority</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div>
          <label
            className="block text-sm font-medium text-gray-900"
            htmlFor="message"
          >
            Message
          </label>

          <textarea
            className="mt-1 w-full resize-none rounded-lg border-2 border-gray-300 focus:border-indigo-500 focus:outline-none bg-white px-4 py-2"
            id="message"
            rows={4}
            placeholder="Your message"
          ></textarea>
        </div>

        <button
          className="block w-full rounded-lg border border-indigo-600 bg-indigo-600 px-12 py-3 text-sm font-medium text-white transition-colors hover:bg-transparent hover:text-indigo-600"
          type="submit"
        >
          Send Message
        </button>
      </form>

      <span id="PING_IFRAME_FORM_DETECTION" style={{ display: "none" }}></span>
    </div>
  );
};

export default page;
