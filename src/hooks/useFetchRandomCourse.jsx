import React, {useState} from 'react'
import { getMostValuedCourses } from '../utils/apiConfig'

export async function useFetchRandomCourse() {

    const {data} = await getMostValuedCourses();
    const randomIndex = Math.floor(Math.random() * data.length);
    const randomCourse = data[randomIndex];

    return randomCourse
}