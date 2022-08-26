export function MailPages({ currPageIdx, onNextPage, onPreviewsPage, pageSize, inboxLength }) {


    function previousDisabled() {
        if (currPageIdx <= 0) return false
    }


    return <section className="mail-pages">
        <div className="pages-content">

            {(currPageIdx <= 0) ?
                <button className="disabled-button" onClick={onPreviewsPage} disabled><i className="fa-solid fa-angle-left"></i></button> :
                <button onClick={onPreviewsPage} ><i className="fa-solid fa-angle-left"></i></button>}
            {((currPageIdx + 1) * pageSize >= inboxLength) ?
                <button className="disabled-button" onClick={onNextPage} disabled><i className="fa-solid fa-angle-right"></i></button> :
                <button onClick={onNextPage}><i className="fa-solid fa-angle-right"></i></button>}
            <span className="page-idx">{currPageIdx}</span>
        </div>
    </section>

}