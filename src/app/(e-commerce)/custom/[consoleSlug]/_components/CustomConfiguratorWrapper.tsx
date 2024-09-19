interface CustomConfiguratorWrapperProps {
    children: React.ReactNode;
}

const CustomConfiguratorWrapper = (props: CustomConfiguratorWrapperProps) => {
    return <>{props.children}</>;
};

export default CustomConfiguratorWrapper;
