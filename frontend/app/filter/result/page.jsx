import styles from './result.module.css';


export default async function Result ({searchParams}) {

    const categoryId = searchParams.category;


    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}`)


    return (
        <>

        </>
    );

}