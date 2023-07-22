import axios from "axios";
import {IBusStop} from "@/interfaces/bus-stop.interface";

const busStopsUrl = 'http://localhost:3000/stops';

export function getBusStops(): Promise<IBusStop[]> {
    return axios.get(busStopsUrl).then((response => {
        return response.data;
    }));
}
