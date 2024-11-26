interface AdminTitleProps {
    text: string;
}

const AdminTitle = (props: AdminTitleProps) => {
    return (
        <h1 className="flex text-center items-center justify-center text-4xl">
            {props.text}
        </h1>
    );
};

export default AdminTitle;
