import React from 'react'
import { useEffect, useState } from 'react';
import { exerciseOptions, fetchData } from './utils/fetchData'
import HorizontalScrollbar from './HorizontalScrollbar';
import './Styles/HomePage.css'

const SearchExercises = ({setExercises ,bodyPart , setBodyPart }) => {
    const [search, setSearch] = useState('');
    const [bodyParts, setBodyParts] = useState([]);

    useEffect(() => {
        const fetchexercisesData = async () => {
            try {
                const bodyPartsData = await fetchData('https://exercisedb.p.rapidapi.com/exercises/bodyPartList', exerciseOptions);

                if (Array.isArray(bodyPartsData)) {
                    setBodyParts(['all', ...bodyPartsData]);
                } else {
                    console.log('Unexpected response format:', bodyPartsData);
                }
            } catch (error) {
                console.log('unexpected error', error)
            }
        }
        fetchexercisesData();
    }, [])

    const handleSearchInput = async () => {
        if (search) {

            try {
                const exerciseData = await fetchData('https://exercisedb.p.rapidapi.com/exercises', exerciseOptions);
                if (Array.isArray(exerciseData)) {
                    const searchedExercises = exerciseData.filter(
                        (exercise) => exercise.name.toLowerCase().includes(search)
                            || exercise.target.toLowerCase().includes(search)
                            || exercise.equipment.toLowerCase().includes(search)
                            || exercise.bodyPart.toLowerCase().includes(search)
                    )

                    setSearch('');
                    setExercises(searchedExercises);
                }else{
                    console.error('Unexpected response format:', exerciseData);
                }

            }catch(error){
                console.error("unexpected error", error)
            }
        }
    }
        return (
            <div className='search-field'>
                <h1>Awesome Exercises You Should Know</h1>
                <div className='input-field'>
                    <input
                        placeholder='Search Exercises'
                        value={search}
                        onChange={(e) => setSearch(e.target.value.toLowerCase())}
                        type='text'
                    />
                    <button onClick={handleSearchInput}>Search</button>
                </div>
                <div className='scrollbar'>
                    <HorizontalScrollbar data={bodyParts} bodyPart={bodyPart} setBodyPart={setBodyPart}/>
                </div>
            </div>
        )
    }

    export default SearchExercises