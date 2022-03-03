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
				<IonCard>
					<IonCardHeader>
						<IonCardTitle>
							<IonIcon icon={warningOutline} color="white" size="large" /> 404
						</IonCardTitle>
						<IonCardSubtitle>The page you were looking for does not exist</IonCardSubtitle>
					</IonCardHeader>
					<IonCardContent>
						(Unless you were looking for a page that does not exist. If that's the case, it definetely existes and you definetely found it.)
					</IonCardContent>
				</IonCard>
			</IonContent>
		</IonPage>
	);
};
