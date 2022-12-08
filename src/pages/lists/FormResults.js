import Results from "./Results";
import { useEffect } from 'react';
import useFormData  from "../useFormData";

export default function FormResults() {
    const formData = useFormData();

    useEffect(() => {
        console.log("actual form data", formData)
    }, [formData])

    return <Results query="/recommendations?limit=5"
        itemsKey={result => result.result[0].items}
        method="POST" data={formData} />
}