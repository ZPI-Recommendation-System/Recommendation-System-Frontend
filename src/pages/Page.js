import Bar from '../components/Bar';

function Page(props) {
    return <>
        <Bar {...props} />{props.children}
    </>
}

export default Page;
