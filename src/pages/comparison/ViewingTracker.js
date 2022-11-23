import useFormData from '../useFormData';
import {useEffect, useState, useRef} from "react";
import {beacon} from "./utility"

const TIME_TO_SEND_BEACON = 5000; // 5 seconds

// Set the name of the hidden property and the change event for visibility
let hidden;
let visibilityChange;
if (typeof document.hidden !== "undefined") { // Opera 12.10 and Firefox 18 and later support
  hidden = "hidden";
  visibilityChange = "visibilitychange";
} else if (typeof document.msHidden !== "undefined") {
  hidden = "msHidden";
  visibilityChange = "msvisibilitychange";
} else if (typeof document.webkitHidden !== "undefined") {
  hidden = "webkitHidden";
  visibilityChange = "webkitvisibilitychange";
}

function useVisible(ref) {
    const [visible, setVisible] = useState(true)
  
    useEffect(() => {
        function handleVisibilityChange() {
            setVisible(!document[hidden])
        }
        document.addEventListener(visibilityChange, handleVisibilityChange, false)
        handleVisibilityChange()
      // Remove the observer as soon as the component is unmounted
      return () => { document.removeEventListener(visibilityChange, handleVisibilityChange, false) }
    }, [])
  
    return visible
  }

export default function ViewingTracker({ id }) {
    const visible = useVisible();
    const formData = useFormData();

    const start = useRef(Date.now());

    useEffect(() => {
        function timeBeacon() {
            const time = Date.now() - start.current;
            if (time > TIME_TO_SEND_BEACON) {
              beacon("viewing-for", id, formData, time);
            }
            start.current = Date.now();
        }
        if (visible) {
            start.current = Date.now();
          } else {
            timeBeacon();
          }
        return () => { timeBeacon() }
      }, [id, visible, formData]);

    
    return <></>
}