export function MailPages({ currPageIdx, onNextPage, onPreviewsPage, pageSize, inboxLength }) {


    function previousDisabled() {
        if (currPageIdx <= 0) return false
    }


    return <section className="mail-pages">
        {(currPageIdx <= 0) ?
            <button onClick={onPreviewsPage} disabled>{'<'}</button> :
            <button onClick={onPreviewsPage} >{'<'}</button>}
        {((currPageIdx + 1) * pageSize >= inboxLength) ?
            <button onClick={onNextPage} disabled>{'>'}</button> :
            <button onClick={onNextPage}>{'>'}</button>}
        <span >{currPageIdx}</span>
    </section>

}