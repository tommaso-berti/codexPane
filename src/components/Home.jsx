export default function Home() {
    return (
        <div>
            <h1 className="text-4xl mb-4">Welcome to my React project!</h1>
            <p>
                This application is built with modern web technologies, including <strong>React</strong>, <strong>Vite</strong>, <strong>Tailwind CSS</strong>, and <strong>Material UI</strong>.
            </p>
            <ul className="list-disc pl-6 my-4">
                <li>Explore the documentation</li>
                <li>Browse the lessons</li>
                <li>Discover how we use Markdown and MDX to create interactive content</li>
                <li>Choose a topic and start exploring the documentation</li>
                <li>Do you have any suggestion or do you need to report a bug? Create a ticket <a href="">here</a></li>
            </ul>
            <p>Happy coding!</p>
        </div>
    );
}
