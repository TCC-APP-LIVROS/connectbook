import { Switch as NativeBaseSwitch, ISwitchProps } from "native-base";




export function Switch({...rest}: ISwitchProps){
    return(
        <NativeBaseSwitch
              onTrackColor="blue.600"
              offTrackColor="gray.300"
              onThumbColor="gray.100"
              offThumbColor="gray.100"
              {...rest}
              />
    )
}
