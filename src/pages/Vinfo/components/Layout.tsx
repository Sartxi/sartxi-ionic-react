
import { IonCol, IonGrid, IonRow } from "@ionic/react";
import { Welcome, Menu, Inventory, Documents } from ".";

export const Desktop = (vinfo: VINFO.Page) => {
    return (
        <div className="content desktop">
            <IonGrid>
                <IonRow>
                    <IonCol>
                        <Menu {...vinfo} />
                        <Welcome {...vinfo} />
                    </IonCol>
                    <IonCol>
                        <Inventory {...vinfo} />
                        <Documents {...vinfo} />
                    </IonCol>
                </IonRow>
            </IonGrid>
        </div>
    );
};

export const Mobile = (vinfo: VINFO.Page) => {
    return (
        <div className="content">
            <Welcome {...vinfo} />
            <Inventory {...vinfo} />
            <Documents {...vinfo} />
            <Menu {...vinfo} />
        </div>
    );
};