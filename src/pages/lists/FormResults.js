import Results from "./Results";
import { useEffect } from 'react';
import useFormData  from "../useFormData";
import _ from "lodash";

export default function FormResults() {
    const formData = useFormData();

    useEffect(() => {
        console.log("actual form data", formData)
    }, [formData])

    return <Results query="/recommendations?limit=50"
        mainItemsGetter={result => result.result[0].items}
        extraItemsGetter={result => _.flatMap(result.result.slice(1), row=>row.items)}
        method="POST" data={formData}
        allowSorting={false} />
}