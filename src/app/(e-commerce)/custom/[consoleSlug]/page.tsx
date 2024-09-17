interface ConsolePageProps {
    params: {
        consoleSlug: string;
    };
}

const ConsolePage = async (props: ConsolePageProps) => {
    return (
        <div>
            <h1>Console</h1>
            <p>Console slug: {props.params.consoleSlug}</p>
        </div>
    );
};

export default ConsolePage;
