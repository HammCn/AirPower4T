import { AirEntity } from '../../base/AirEntity'
import { IFile } from '../../interface/IFile'

/**
 * 内置的文件类
 * @author Hamm
 */
export class AirFileEntity extends AirEntity implements IFile {
  url!: string
}
