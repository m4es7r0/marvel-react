import { useEffect, useState } from "react"
import { useFormik } from "formik"
import { Link } from "react-router-dom"
import * as yup from 'yup'

import { useLazyGetHeroByNameQuery } from "../../redux/api/marvel.api"

import ErrorMessage from "../errorMessage/errorMessage"

import './formSearch.scss'

export default function FormSearch() {
    const [char, setChar] = useState(null)
    const [fetch, { isLoading, isFetching, isError }] = useLazyGetHeroByNameQuery()

    const formik = useFormik({
        initialValues: { charName: '' },
        validationSchema: yup.object({
            charName: yup.string().required('This field is required')
        }),
        validateOnChange: false,
        validateOnBlur: false,
        onSubmit: (values) => {
            fetch(values.charName)
                .then(res => setChar(res.data))
        }
    })


    useEffect(() => {
        if (formik.values.charName === '') {
            formik.handleReset()
            setChar(null)
        }
        // eslint-disable-next-line
    }, [formik.values.charName])

    const errorMessage = isError ? <div className="char__search-critical-error"><ErrorMessage /></div> : null;
    const results = !char ? null : char.length > 0 ?
        <div className="char__search-wrapper">
            <div className="char__search-success">There is! Visit "{char[0].name}" page?</div>
            <Link to={`/character/${char[0].id}`} className="button button__secondary">
                <div className="inner">To page</div>
            </Link>
        </div> :
        <div className="char__search-error">
            The character was not found. Check the name and try again
        </div>;

    return (
        <div className="char__search-form">
            <form onSubmit={formik.handleSubmit}>
                <label className="char__search-label">Or find a character by name:</label>
                <div className="char__search-wrapper">
                    <input
                        id="charName"
                        name='charName'
                        type='text'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="Enter name"
                        tabIndex={7}
                    />
                    <button
                        type='submit'
                        className="button button__main"
                        disabled={isLoading || isFetching}
                        tabIndex={8}>
                        <div className="inner">find</div>
                    </button>
                </div>
                {formik.errors.charName && formik.touched.charName
                    && <div className="char__search-error">
                        {formik.errors.charName}
                    </div>}
            </form>
            {results}
            {errorMessage}
        </div>
    )
}