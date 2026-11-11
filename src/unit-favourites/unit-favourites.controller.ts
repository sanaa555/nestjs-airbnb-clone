import {
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Post,
    Query,
} from "@nestjs/common";
import { Authorize } from "src/auth/decorators/roles.decorator";
import { Roles } from "src/common/constants";
import { UnitIdDto } from "./dtos/unit-id.dto";
import { CurrentAccount, Principale } from "src/auth/decorators/current-account.decorator";
import { UnitFavouritesService } from "./unit-favourites.service";
import { FindUnitFavouriteDto } from "./dtos/find-unit-favourite.dto";
import { PaginatedResult } from "src/common/data-access";
import { UnitFavouriteResponseDto } from "./dtos/unit-favourite-response.dto";
import { AddFavouriteSwagger } from "./swagger/addFavourite.swagger";
import { DeleteFavouriteSwagger } from "./swagger/deleteFavourite.swagger";
import { GetFavouriteSwagger } from "./swagger/getFavourite.swagger";
import { ApiTags } from "node_modules/@nestjs/swagger/dist/decorators/api-use-tags.decorator";
import { API_TAGS } from "src/common/swagger/constant";

@Controller("unit-favourites")
@ApiTags(API_TAGS.UNIT_FAVORITES)
@Authorize(Roles.USER)
export class UnitFavouritesController {
    constructor(
        private readonly unitFavouritesService: UnitFavouritesService
    ) {}

    @Post("/:unitId")
    @AddFavouriteSwagger()
    @HttpCode(HttpStatus.NO_CONTENT)
    async addFavourite(
        @Param() param: UnitIdDto,
        @CurrentAccount() principale: Principale
    ): Promise<void> {
        return this.unitFavouritesService.addFavourite(
            param.unitId,
            principale.user
        );
    }

    @Delete("/:unitId")
    @DeleteFavouriteSwagger()
    @HttpCode(HttpStatus.NO_CONTENT)
    async deleteFavourite(
        @Param() param: UnitIdDto,
        @CurrentAccount() principale: Principale
    ): Promise<void> {
        return this.unitFavouritesService.removeFavourite(
            param.unitId,
            principale.user
        );
    }

    @Get()
    @GetFavouriteSwagger()
    async getFavourite(
        @Query() query: FindUnitFavouriteDto,
        @CurrentAccount() principale: Principale
    ): Promise<PaginatedResult<UnitFavouriteResponseDto>> {
        return this.unitFavouritesService.getFavourite(
            query,
            principale.user
        );
    }
}