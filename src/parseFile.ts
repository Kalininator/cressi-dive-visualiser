import { z } from "zod"

export const DiveData = z.object({
  ConfigCressiUCI: z.array(
    z.object({ ID: z.string(), ID_Lingua: z.string(), UM: z.string() })
  ),
  Subacquei: z.array(
    z.object({
      ID: z.string(),
      nome: z.string(),
      cognome: z.string(),
      Dan_ID: z.string(),
      Dan_Password: z.string()
    })
  ),
  Device: z.array(
    z.object({
      ID: z.string(),
      model_type: z.string(),
      fw_version: z.string(),
      serial_number: z.string(),
      name: z.string(),
      ultima_sincronizzazione: z.string(),
      NomeSub: z.string(),
      Dan_ID: z.string(),
      Dan_Password: z.string()
    })
  ),
  Localita: z.array(
    z.object({
      ID: z.string(),
      ID_Nazione: z.string(),
      nome_localita: z.string()
    })
  ),
  Siti: z.array(
    z.object({
      ID: z.string(),
      ID_Localita: z.string(),
      nome_sito: z.string(),
      latitudine: z.string(),
      longitudine: z.string()
    })
  ),
  FreeDive: z.array(z.unknown()),
  FreeProfilePoint: z.array(z.unknown()),
  FreeDipStats: z.array(z.unknown()),
  AdvancedFreeDive: z.array(z.unknown()),
  AdvancedFreeProfilePoint: z.array(z.unknown()),
  AdvancedFreeDipStats: z.array(z.unknown()),
  GaugeDive: z.array(z.unknown()),
  GaugeProfilePoint: z.array(z.unknown()),
  ScubaDive: z.array(
    z.object({
      ID: z.string(),
      ProgressiveNumber: z.string(),
      DiveType: z.string(),
      DiveStart: z.string(),
      DiveLenghtTicks: z.string(),
      Weather: z.string(),
      AirTemperature: z.string(),
      Current: z.string(),
      Visibility: z.string(),
      CNSStart: z.string(),
      Rgbm_Enne: z.string(),
      LvlAltitudine: z.string(),
      LvlSafetyFactor: z.string(),
      DeepStopEnabled: z.string(),
      MixPercOssigenoSerialize: z.string(),
      MixPPO2MaxSerialize: z.string(),
      SurfaceTimeTicks: z.string(),
      PMaxPrecedente: z.string(),
      PTissueStartSerialize: z.string(),
      Note: z.string(),
      ID_Subacqueo: z.string(),
      ID_Sito: z.string(),
      ID_Device: z.string(),
      NomeSub: z.string(),
      TotalElapsedSeconds: z.string(),
      StopMode: z.string(),
      DecoStopViolation: z.string(),
      DecoStopTempViolation: z.string(),
      StartSpeedFactorAlarmStatus: z.string()
    })
  ),
  ScubaProfilePoint: z.array(
    z.object({
      ID: z.string(),
      ID_ScubaDive: z.string(),
      Sequence: z.string(),
      Depth: z.string(),
      Temperature: z.string(),
      TimeTicks: z.string(),
      ElapsedSeconds: z.string()
    })
  )
})

export type DiveData = z.infer<typeof DiveData>;

export function parseFile(file: string): DiveData {
  return DiveData.parse(JSON.parse(file))
}
