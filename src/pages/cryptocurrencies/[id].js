import { Crypto } from '@/src/components/view'

export default function crypto({ id }) {
    return <Crypto id={id} />
}

export async function getServerSideProps(context) {
    const id = context.query.id

    return {
        props: { id }
    }
}
