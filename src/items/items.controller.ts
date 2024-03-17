import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { Item } from '../entities/item.entity';
import { ItemsService } from './items.service';
import { CreateItemDto } from './dto/create-item.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { GetUser } from 'src/auth/decorator/get-user.decorator';
import { User } from 'src/entities/user.entity';

@Controller('items')
@UseInterceptors(ClassSerializerInterceptor)
export class ItemsController {
    constructor(private readonly itemService: ItemsService) {}

    @Get()
    async findAll(): Promise<Item[]> {
        return await this.itemService.findAll();
    }

    @Get(':id') // /items/hoge1
    async findById(@Param('id', ParseUUIDPipe) id: string): Promise<Item> {
        return await this.itemService.findById(id);
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    async create(
        @Body() createItemDto: CreateItemDto,
        @GetUser() user:User,
    ): Promise<Item> {
        console.log(user);
        return await this.itemService.create(createItemDto, user);
    }

    @Patch(':id')
    @UseGuards(JwtAuthGuard)
    async updateStatus(
        @Param('id', ParseUUIDPipe) id: string,
        @GetUser() user: User,
    ): Promise<Item> {
        return await this.itemService.updateStatus(id, user);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    async delete(
        @Param('id', ParseUUIDPipe) id: string,
        @GetUser() user:User,
    ): Promise<void> {
        await this.itemService.delete(id, user);
    }
}
