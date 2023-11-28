async function getNote(noteId: string){
    const res = await fetch(
        `http://127.0.0.1:8090/api/collections/notes/records/${noteId}`,
        {
            next : {revalidate:10}
        }
        );
    const data = await res.json();
    return data;
}

export default async function singleNote({params}:any){
    const note = await getNote(params.id);
    return (
        <div className=" border-2 border-blue-600">
            <h2>{note.title}</h2>
            <div dangerouslySetInnerHTML={{ __html: note.body }} />
            <span>{note.created}</span>
        </div>
    );
}