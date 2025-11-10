use testdb
go

/*

 select id 
      , name    
      , iamge   
   into #base
   from storyinfo

drop table storyinfo
go

create table storyinfo(
    id                          int                 not null,   --* ID
    name                        varchar(50)         null,       --* 이름
    image                       varchar(2000)       null,       --* 이미지경로
    primary key(id)
)
go


 insert into storyinfo
 select *
   from #base

*/


drop procedure asp_storyinfo_s
go

--* ----------------------------------------------------*---------------------------*-------------------*-------------------------------
create procedure asp_storyinfo_s                        
as
begin
     select * 
       from storyinfo
      where id < 4
      order by id

	--* asp_storyinfo_s 
end
go

drop procedure asp_storyinfo_k
go

--* ----------------------------------------------------*---------------------------*-------------------*-------------------------------
create procedure asp_storyinfo_k 			                @id_s                       int                 --* ID   
as
begin
     select * 
       from storyinfo
      where id = @id_s
	
	--* asp_storyinfo_k '1'
end
go

drop procedure asp_storyinfo_u
go

--* ----------------------------------------------------*---------------------------*-------------------*-------------------------------
create procedure asp_storyinfo_u                        @id                         int                 --* ID     
                                                      , @name                       varchar(50)         --* 이름
                                                      , @image                      varchar(50)         --* 이미지  
as
begin

	declare @affected_rows int
	      , @message       varchar(1000)
     select @affected_rows = 0
	      , @message = ''

    if exists(   select *
                   from storyinfo
                  where id = @id )
    begin
         update storyinfo 
            set name   = @name   
              , image  = @image
          where id = @id

		 select @affected_rows = 1
		      , @message = 'Ok'
    end
    else
    begin
         insert into storyinfo( id 
                              , name    
                              , image
                                )
         values( @id                          
               , @name 	
               , @image
                 )  

		 select @affected_rows = 1
		      , @message = 'Ok'
    end               

	 select @affected_rows as affected_rows
	      , @message as message

	--* asp_storyinfo_u 1, '나의 스토리', '../../assets/images/userProfile.jpeg'
	--* asp_storyinfo_u 2, 'john', '../../assets/images/profile1.jpeg'
	--* asp_storyinfo_u 3, 'tonny', '../../assets/images/profile2.jpeg'
	--* asp_storyinfo_u 4, 'daniel', '../../assets/images/profile3.jpeg'
	--* asp_storyinfo_u 5, 'sojeong', '../../assets/images/profile4.jpeg'
	--* asp_storyinfo_u 6, 'jaeho', '../../assets/images/profile5.jpeg'
/*
http://192.168.45.122:8081/assets/images/post1.jpeg


	update storyinfo
	   set image = replace(image,'../..','http://192.168.45.122:8081')
*/

	   

	--* asp_storyinfo_u ', '', ''

	--* asp_storyinfo_s
end
go

drop procedure asp_storyinfo_d
go

--* ----------------------------------------------------*---------------------------*-------------------*-------------------------------
create procedure asp_storyinfo_d                        @id                         int                 --* ID     
as
begin

	declare @affected_rows int
	      , @message       varchar(1000)
     select @affected_rows = 0
	      , @message = ''

	 delete                  
       from storyinfo             
      where id = @id

     select @affected_rows = 1
          , @message = 'Ok'

	 select @affected_rows as affected_rows
	      , @message as message

	--* asp_storyinfo_d 1

end
go
