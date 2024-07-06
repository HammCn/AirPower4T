import { AirEntity } from '../../base/AirEntity'
import { IFile } from '../../interface/IFile'

/**
 * # 内置的文件类
 * 如需扩展, 请自行实现 `IFile`
 * @author Hamm.cn
 */
export class AirFileEntity extends AirEntity implements IFile {
  url!: string
}
