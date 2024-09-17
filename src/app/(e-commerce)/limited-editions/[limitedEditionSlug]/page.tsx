interface LimitedEditionProductPageProps {
    params: {
        limitedEditionSlug: string;
    };
}

const LimitedEditionProductPage = async (
    props: LimitedEditionProductPageProps
) => {
    return (
        <div>
            <h1>Édition Limitée</h1>
            <p>Slug édition limitée : {props.params.limitedEditionSlug}</p>
        </div>
    );
};

export default LimitedEditionProductPage;
