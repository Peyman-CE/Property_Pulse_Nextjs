const PropertyPage = async ({ params , searchParams}) => {
    const { id } = await params;
    return <div>property page { id }</div>;
}
 
export default PropertyPage;