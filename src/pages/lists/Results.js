import Selection from "./Selection";
import { Laptop, API_URL, useRequest } from "../../api/api";
import { useEffect, useState, useRef } from "react";
import _ from "lodash";

function itemToLaptop(item) {
    return new Laptop(item.id, item.name, item.images[0].url,
        item.processor?.benchmark?.benchmark, item.graphics?.benchmark?.benchmark);
}

function resultItems(result) {
    return result.items;
}

function Results({ query, method, data, mainItemsGetter = resultItems, extraItemsGetter, allowSorting = true, paging }) {

    const options = {}
    if (method)
        options.method = method;
    if (data) {
        options.body = JSON.stringify(data)
        options.headers = {
            'Content-Type': 'application/json'
        }
    }

    const [sorting, setSorting] = useState("&sortType=score&direction=DESC");

    const [page, setPage] = useState(0);
    const pageItems = useRef([]);

    const requestJSON = JSON.stringify([query, method, data]);
    useEffect(() => {
        console.log("Results reset")
        setPage(0);
        pageItems.current = [];
    }, [requestJSON]);

    function loadMore() {
        setPage(page + 1);
    }

    let url = API_URL + query;

    const ITEMS_PER_PAGE = 10;
    const MAX_LIMIT = 50;
    const limit = paging ? ITEMS_PER_PAGE : MAX_LIMIT;

    url += "&limit=" + limit;
    if (paging && page > 0) {
        url += "&page=" + page;
    }

    if (allowSorting)
        url += sorting;

    const [isLoaded, result, error] = useRequest(url, options)

    function flatPageItems() {
        // uniqBy is needed for the React key prop correctness
        return _.uniqBy(_.flatten(pageItems.current), "id");
    }

    let main = []
    let extra = []
    let showMoreButton = false;
    let noItemsText = "Brak wyników";

    if (error) {
        noItemsText = `Error: ${error.message}`
    } else if (!isLoaded) {
        noItemsText = "Loading..."
    } else {
        console.log(result)
        let currentMain = mainItemsGetter(result).map(itemToLaptop);
        pageItems.current[page] = currentMain;
        main = paging ? flatPageItems() : currentMain;
        extra = extraItemsGetter ? extraItemsGetter(result).map(itemToLaptop) : [];
        showMoreButton = paging && currentMain.length >= limit;
    }

    return (
        <div className="content">
            <Selection
                main={main}
                extra={extra}
                setSorting={({ value }) => setSorting(value)}
                allowSorting={allowSorting}
                loadMore={showMoreButton && loadMore}
                noItemsText={noItemsText}
            />
        </div>);
}

export default Results;