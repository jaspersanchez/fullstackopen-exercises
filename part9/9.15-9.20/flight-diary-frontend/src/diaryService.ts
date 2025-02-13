import axios from "axios"
import { DiaryEntry, NewDiaryEntry, NonSensitiveDiaryEntry } from "./types"

const baseUrl = 'http://localhost:3000/api/diaries'

export const getAllEntries = () => {
  return axios
    // Add type parameter here
    .get<NonSensitiveDiaryEntry[]>(baseUrl)
    .then(res => res.data)
}

export const createDiaryEntry = (obj: NewDiaryEntry) => {
  return axios
    .post<DiaryEntry>(baseUrl, obj)
    .then(res => res.data)
}