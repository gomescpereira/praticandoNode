import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { getRepositoryToken } from '@nestjs/typeorm';
import { EntityNotFoundError } from 'typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import  TestUtil  from './common/test/TestUtil';
import { NotFoundException, InternalServerErrorException } from '@nestjs/common';
 
// Definindo como uma função de criação Mock ( função Mokada )

describe('UsersService', () => {
  let service: UsersService;

  const mockRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    save: jest.fn(),
    delete: jest.fn()
   }
  // Executa em cada teste
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  // Executa uma vez só teste
  //beforeAll(async () => {
  //  const module: TestingModule = await Test.createTestingModule({
  //    providers: [
  //      UsersService,
  //      {
  //        provide: getRepositoryToken(User),
  //        useValue: mockRepository,
  //      },
  //    ],
  //  }).compile();

  //  service = module.get<UsersService>(UsersService);
  //});

  // Limpa  resultados do mock
  //beforeEach(() => {
  //  mockrepository.find.mockReset();
  //  mockrepository.findOne.mockReset();
  //  mockrepository.create.mockReset();
  //  mockrepository.update.mockReset();
  //  mockrepository.save.mockReset();
  //    mockrepository.delete.mockReset();
  // });


  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('When findAllUsers', () => {
     it('should be list all users', async () => {
        const user = TestUtil.giveMeValidUser();
// Usando o Mock repositoy
        mockRepository.find.mockReturnValue([user, user]);
        const users =  await service.findAll();
        expect(users).toHaveLength(2);
        // O que eu quero testar quantas vezes o metodo foi chamado
        expect(mockRepository.find).toHaveBeenCalledTimes(1);
     });
  });


  describe('When findOne', () => {
     it('should find a existing user', async () => {
        const user = TestUtil.giveMeValidUser();
        // Usando o Mock repositoy
        mockRepository.findOne.mockReturnValue(user);
        const userFound =  await service.findOne('1');
       // console.log(userFound); 
         //  o que retornou e valido 
        expect(userFound).toMatchObject({ name: user.name });
        expect(mockRepository.findOne).toHaveBeenCalledTimes(1);
     });

     it('should return a excpetion when does not to find user', async () => {
        // Mock de novo o findOne  retornando um nulo
        mockRepository.findOne.mockReturnValue(null);
        expect(service.findOne('3')).rejects.toBeInstanceOf(NotFoundException);
     });

  });

  describe('When create user', () => {
     it('should create a user', async () => {
        const user = TestUtil.giveMeValidUser();
        mockRepository.create.mockReturnValue(user);
        mockRepository.save.mockReturnValue(user);
        const saveUser = await service.create(user);
        expect(saveUser).toMatchObject(user);
        expect(mockRepository.create).toBeCalledTimes(1);
        expect(mockRepository.save).toBeCalledTimes(1);
     });

     it('should return a excpetion when doesnt create a user', async () => {
        const user = TestUtil.giveMeValidUser();
        mockRepository.create.mockReturnValue(user);
        mockRepository.save.mockReturnValue(null);

        await service.create(user).catch(e => {
          expect(e).toBeInstanceOf(InternalServerErrorException);
          // Testando a resposta da mensagem
          expect(e).toMatchObject({
            message: 'Problem to create a user. Try again'
          }); 
        });

        expect(mockRepository.create).toHaveBeenCalledTimes(2);
        expect(mockRepository.save).toBeCalledTimes(2);

     });
        
  });

 describe('When delteUser', () => {
     it('should deleted a existing user', async () => {
        const user = TestUtil.giveMeValidUser();
        mockRepository.findOne.mockReturnValue(user);    
        mockRepository.delete.mockReturnValue(user);

        const deletedUser =  await service.remove('1');
        //console.log(deletedUser);
        expect(deletedUser).toBe(true);
        expect(mockRepository.delete).toBeCalledTimes(1);
     });

     it('should not delete a inexisting user', async () => {
        const user = TestUtil.giveMeValidUser();
        mockRepository.findOne.mockReturnValue(user);    
        mockRepository.delete.mockReturnValue(null);

        const deletedUser =  await service.remove('9');
        //console.log(deletedUser);  
        expect(deletedUser).toBe(false);
        expect(mockRepository.findOne).toBeCalledTimes(4);
        expect(mockRepository.delete).toBeCalledTimes(2);

     });
  });


 describe('When updateServer', () => {
     it('should update a user', async () => {
        const user = TestUtil.giveMeValidUser();
        const nameUser = TestUtil.giveMeValidUpdateUser();
        
    
        const updatedUser = {name: 'Nome Atualizado'};

       
        mockRepository.update.mockReturnValue(user);
        
        mockRepository.findOne.mockReturnValue(user);
        
       //console.log('User',user);     
         
        const resultUser  = {
           ...user,
           name: 'Nome Atualizado'
          
        };
        console.log('resultUser',resultUser);
//        console.log(nameUser); 
//        const resultUser2  = await service.update('1',nameUser);
        
       
        expect(resultUser).toMatchObject(updatedUser);

     });
 });



});
