import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { Public } from '../auth/public.decorator';

@Controller('media')
export class MediaController {
  @Public()
  @Post('upload')
  async uploadMedia(@Body() body: { imageUrl?: string; name?: string }) {
    // Media storage abstraction
    return {
      url: body.imageUrl || 'https://blog.bhlankatours.com/wp-content/uploads/2024/08/Explore-the-Cultural-Heritage-Historical-Tours-in-Sri-Lanka.jpg',
      filename: body.name || 'uploaded_image.jpg',
      provider: 'local',
    };
  }
}
