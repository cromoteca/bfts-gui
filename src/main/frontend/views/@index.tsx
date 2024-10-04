import { Grid, GridColumn, PasswordField, VerticalLayout } from "@vaadin/react-components";
import Pair from "Frontend/generated/com/cromoteca/bfts/model/Pair";
import ConnectedStorageConfiguration from "Frontend/generated/com/cromoteca/services/ConfigurationService/ConnectedStorageConfiguration";
import LocalStorageConfiguration from "Frontend/generated/com/cromoteca/services/ConfigurationService/LocalStorageConfiguration";
import { ConfigurationService } from "Frontend/generated/endpoints";
import { useEffect, useState } from "react";

export default function HomeView() {
  const [storages, setStorages] = useState<Pair<LocalStorageConfiguration[], ConnectedStorageConfiguration[]>>();
  const [password, setPassword] = useState<string>('');

  useEffect(() => {
    ConfigurationService.listStorages().then(setStorages);
  }, []);

  return <VerticalLayout className="p-m">
    <PasswordField
      label="Master Password"
      value={password}
      onValueChanged={({ detail: { value } }) => setPassword(value)}
      revealButtonHidden={true}
    />
    Local Storages
    <Grid items={storages?.first}>
      <GridColumn path="name" />
      <GridColumn path="path" />
      <GridColumn path="port" />
    </Grid>
    Connected Storages
    <Grid items={storages?.second}>
      <GridColumn path="name" />
      <GridColumn path="path" />
      <GridColumn path="encryptionType" />
    </Grid>
  </VerticalLayout>;
}
