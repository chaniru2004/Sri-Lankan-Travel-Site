import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { Public } from '../auth/public.decorator';

@Controller('media')
export class MediaController {
  @Public()
  @Post('upload')
  async uploadMedia(@Body() body: { imageUrl?: string; name?: string }) {
    // Media storage abstraction
    return {
      url: body.imageUrl || 'https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?auto=format&fit=crop&w=1200&q=80',
      filename: body.name || 'uploaded_image.jpg',
      provider: 'local',
    };
  }
}
