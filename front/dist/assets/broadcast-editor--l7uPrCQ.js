const r=`<div kll-t="broadcastLayout">\r
    <div class="sm:grid sm:grid-cols-[25dvw_1fr_20dvw] h-full gap-5" kll-ctrl="broadcast" kll-id="broadcast">\r
        <aside kll-tc="broadcastInfo" kll-b="broadcast.broadcast,broadcast_info_title.value"></aside>\r
\r
        <section class="relative">\r
            <div class="absolute inset-0 overflow-y-auto flex flex-col gap-4 px-3">\r
                <div kll-tc="addChronicleButton" kll-b="lock.lock" kll-s-position="0"></div>\r
                <div kll-tc="addFirstChronicle" kll-b="broadcast.broadcast"></div>\r
                <div kll-id="chronicles" kll-b="broadcast.broadcast" kll-ctrl="chronicles">\r
                    <div kll-t="loader"></div>\r
                </div>\r
              <div>\r
                chroniques\r
                <p>Faire des : </p>\r
               \r
                <p>Numéroté tous le temps les chroniques</p>\r
                <p>editeur toolbar au survol</p>\r
                <p> invisible input lockable</p>\r
                <p>mini selector ou selector du navigateur pour les chroniqueurs</p>\r
                <p>Nom sur les media en overlay</p>\r
                <p> un media 'fantôme' en guise de bouton pour ajout ([ + ])</p>\r
              </div>\r
            </div>\r
        </section>\r
        <nav class="relative">\r
            <div class="absolute inset-0 overflow-y-auto flex flex-cols gap-2 pr-3">\r
                arbre. Voir sur notion pour le DnD (une petite ligne au survol)\r
            </div>\r
        </nav>\r
    </div>\r
</div>`;export{r as default};
