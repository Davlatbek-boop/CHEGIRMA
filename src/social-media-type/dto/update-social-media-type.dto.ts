import { PartialType } from '@nestjs/swagger';
import { CreateSocialMediaTypeDto } from './create-social-media-type.dto';

export class UpdateSocialMediaTypeDto extends PartialType(CreateSocialMediaTypeDto) {}
