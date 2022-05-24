import { useEffect } from "react";
import { warningOutline } from "ionicons/icons";
import { IonCard, IonCardHeader, IonCardContent, IonCardSubtitle, IonCardTitle, IonContent, IonPage, IonIcon } from "@ionic/react";

export const App404 = () => {
	useEffect(() => {
		document.title = "404 Not Found";
	}, []);

	return (
		<IonPage>
			<IonContent>
				<div id="fourofour">
					<IonCard>
						<IonCardHeader>
							<IonIcon icon={warningOutline} color="white" />
							<IonCardTitle>Oops, the page you were looking for does not exist.</IonCardTitle>
						</IonCardHeader>
						<IonCardContent>
							Were you expecting to find a vehicle report? Please email us at vinfo@vinfo.info
						</IonCardContent>
					</IonCard>
				</div>
			</IonContent>
		</IonPage>
	);
};
