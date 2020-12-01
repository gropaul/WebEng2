import React from 'react';
import {Card,CardHeader,CardContent} from 'framework7-react';
import './wikiInfo.css'

class WikiInfo extends React.Component {
    render(){
        return (
            <Card>
              <CardHeader className="header">
                  <div>
                <div className="header-title">Stuttgart</div>
                <div className="header-subtitle">Stadt in Baden-Württemberg</div>
                </div>
              </CardHeader>
              <CardContent>
              Stuttgart ist die Hauptstadt des südwestdeutschen Bundeslands Baden-Württemberg und ein bekannter Produktionsstandort. Sowohl Mercedes-Benzals auch Porsche haben hier ihren Hauptsitz und betreiben eigene Museen.Stuttgart verfügt über zahlreiche Parks, die sich als grüner Gürtel durch die Innenstadt ziehen. Beliebt sind unter anderem der Schlossgarten, der Rosensteinpark und der Park am Killesberg"
              </CardContent>
            </Card>
        );
    }
}
export default WikiInfo;