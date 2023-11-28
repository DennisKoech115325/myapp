import Link from "next/link";

async function getNotes(){
    const res = await fetch(
        'http://127.0.0.1:8090/api/collections/notes/records?page=1&perPage=10',
        {cache:'no-store'}
        );
    const data = await res.json();
    return data?.items as any[];
}

export default async function NotesPages(){
    const notes = await getNotes();
    return(
        <div>
            <h1>Notes</h1>
            <div>
                {notes?.map((note)=>{
                    return <Note key={note.id} note={note}/>;
                })}
            </div>
        </div>
    );
}

function Note({note}:any){
    const {id, title, body, created} = note || {};
    return (
        <div className=" border-2 border-blue-600">
            <Link href={`/notes/${id}`}>
                <h2>{title}</h2>
            </Link>
            <div dangerouslySetInnerHTML={{ __html: body }} />
            <span>{created}</span>
        </div>
    );
}