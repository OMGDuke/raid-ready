describe('MainController', function() {

  var MainController;

  var mockGuildService = { getMembers: function() {
    return {
      then: function(callback) {return callback(apiJSON);}
    };
  }};

  beforeEach(function() {
    module('raidReadyApp', function($provide) {
      $provide.value('GuildService', mockGuildService);
    });
  });

  beforeEach(inject(function($controller, $rootScope) {
    spyOn(mockGuildService, 'getMembers')
      .and.callThrough();
    scope = $rootScope.$new();
    mainController = $controller('MainController', {
      $scope: scope
    });
  }));

  describe('initialization', function() {
    it('is initialized with no server', function() {
      expect(mainController.serverName).not.toBeDefined();
    });

    it('is initialized with no guild name', function() {
      expect(mainController.guildName).not.toBeDefined();
    });
  });

  describe('#searchForGuild', function() {
    it('stores the server name', function() {
      mainController.searchForGuild('Server1', 'Name1');
      expect(mainController.serverName).toEqual("Server1");
    });

    it('stores the server name', function() {
      mainController.searchForGuild('Server1', 'Name1');
      expect(mainController.guildName).toEqual("Name1");
    });

    it('stores a list of members', function() {
      mainController.searchForGuild('Server1', 'Name1');
      expect(mainController.members).toEqual(apiJSON.members);
    });
  });

  describe('#filterMembers', function() {
    it('returns a list of characters at level 110 and with a spec key', function() {
      expect(mainController.filterMembers(apiJSON.members).length).toEqual(15);
    });
  });

  describe('#findTanks', function() {
    it('returns a list of characters with the tank role', function() {
      mainController.findTanks(apiJSON.members);
      expect(mainController.tanks.length).toEqual(2);
    });
  });

  describe('#findDPS', function() {
    it('returns a list of characters with the DPS role', function() {
      mainController.findDPS(apiJSON.members);
      expect(mainController.dps.length).toEqual(10);
    });
  });

  describe('#findHealers', function() {
    it('returns a list of characters with the HEALING role', function() {
      mainController.findHealers(apiJSON.members);
      expect(mainController.healers.length).toEqual(4);
    });
  });

  describe("#readyFor()", function() {
    it('takes in a raid size of 10 and returns Yes', function() {
      mainController.findRoles(apiJSON.members);
      expect(mainController.readyFor("10")).toEqual("Yes");
    });

    it('takes in a raid size of 15 and returns Yes', function() {
      mainController.findRoles(apiJSON.members);
      expect(mainController.readyFor("15")).toEqual("Yes");
    });

    it('takes in a raid size of 20 and returns No', function() {
      mainController.findRoles(apiJSON.members);
      expect(mainController.readyFor("20")).toEqual("No");
    });
  });

  describe("#numberCheck", function() {
    it("returns true if you you have the correct members for a 10 man", function() {
      mainController.findRoles(apiJSON.members);
      expect(mainController.numberCheck([2, 3, 5])).toEqual(true);
    });

    it("returns true if you you have the correct members for a 15 man", function() {
      mainController.findRoles(apiJSON.members);
      expect(mainController.numberCheck([2, 4, 9])).toEqual(true);
    });

    it("returns false if you you have the incorrect members for a 20 man", function() {
      mainController.findRoles(apiJSON.members);
      expect(mainController.numberCheck([3, 5, 12])).toEqual(false);
    });
  });

  describe("#missingRoleCalc(role, raidSize)", function() {
    it('returns 0 if you have all the tanks you need', function() {
      mainController.findRoles(apiJSON.members);
      expect(mainController.missingRoleCalc("tank", "10")).toEqual(0);
    });

    it('returns 0 if you have all the healers you need', function() {
      mainController.findRoles(apiJSON.members);
      expect(mainController.missingRoleCalc("healer", "20")).toEqual(0);
    });

    it('returns a number if you  don\'t have all the dps you need', function() {
      mainController.findRoles(apiJSON.members);
      expect(mainController.missingRoleCalc("dps", "30")).toEqual(12);
    });
  });

  describe('#findPlayerClass()', function() {
    it("takes in the interger 1 and returns warrior as a string", function() {
      expect(mainController.findPlayerClass(1)).toEqual('Warrior');
    });

    it("takes in the interger 7 and returns Shaman as a string", function() {
      expect(mainController.findPlayerClass(7)).toEqual('Shaman');
    });
  });

  describe('#filterByRank()', function() {
    it('returns true if the character rank is below the selected rank', function() {
      scope.filterByRank(apiJSON.members[1]);
    });
  });

  describe('#memberCount()', function() {
    it('returns the number of members based on rank filter', function() {
      expect(mainController.memberCount(apiJSON.members, 7)).toEqual(12);
    });
  });

  var apiJSON = {realm:"Server1", name:"Name1", members:[{
    "character": {
      "name": "A",
      "realm": "Draenor",
       "battlegroup": "Embuscade / Hinterhalt",
       "class": 2,
       "race": 10,
       "gender": 0,
       "level": 110,
       "achievementPoints": 2650,
       "thumbnail": "gnomeregan/189/87609533-avatar.jpg",
       "spec": {
         "name": "Holy",
         "role": "HEALING",
         "backgroundImage": "bg-paladin-protection",
         "icon": "ability_paladin_shieldofthetemplar",
         "description": "Uses Holy magic to shield himself and defend allies from attackers.",
         "order": 1
       },
       "guild": "Over Raided",
       "guildRealm": "Draenor",
       "lastModified": 0
     },
     "rank": 7
   }, {
         "character": {
             "name": "Jarlstrom",
             "realm": "Draenor",
             "battlegroup": "Embuscade / Hinterhalt",
             "class": 7,
             "race": 9,
             "gender": 1,
             "level": 110,
             "achievementPoints": 7980,
             "thumbnail": "gnomeregan/157/88055709-avatar.jpg",
             "spec": {
                 "name": "Restoration",
                 "role": "HEALING",
                 "backgroundImage": "bg-shaman-enhancement",
                 "icon": "spell_shaman_improvedstormstrike",
                 "description": "A totemic warrior who strikes foes with weapons imbued with elemental power.",
                 "order": 1
             },
             "guild": "Over Raided",
             "guildRealm": "Draenor",
             "lastModified": 0
         },
         "rank": 5
     }, {
         "character": {
             "name": "Picklocked",
             "realm": "Draenor",
             "battlegroup": "Embuscade / Hinterhalt",
             "class": 9,
             "race": 2,
             "gender": 1,
             "level": 110,
             "achievementPoints": 10840,
             "thumbnail": "gnomeregan/144/88199312-avatar.jpg",
             "spec": {
                 "name": "Demonology",
                 "role": "DPS",
                 "backgroundImage": "bg-warlock-demonology",
                 "icon": "spell_shadow_metamorphosis",
                 "description": "A master of demons who compels demonic powers to aid him.",
                 "order": 1
             },
             "guild": "Over Raided",
             "guildRealm": "Draenor",
             "lastModified": 0
         },
         "rank": 6
     }, {
         "character": {
             "name": "Brandwag",
             "realm": "Draenor",
             "battlegroup": "Embuscade / Hinterhalt",
             "class": 6,
             "race": 2,
             "gender": 0,
             "level": 110,
             "achievementPoints": 4295,
             "thumbnail": "gnomeregan/82/93354066-avatar.jpg",
             "spec": {
                 "name": "Frost",
                 "role": "DPS",
                 "backgroundImage": "bg-deathknight-frost",
                 "icon": "spell_deathknight_frostpresence",
                 "description": "An icy harbinger of doom, channeling runic power and delivering vicious weapon strikes.",
                 "order": 1
             },
             "guild": "Over Raided",
             "guildRealm": "Draenor",
             "lastModified": 0
         },
         "rank": 7
     }, {
         "character": {
             "name": "Kiyuko",
             "realm": "Draenor",
             "battlegroup": "Embuscade / Hinterhalt",
             "class": 10,
             "race": 26,
             "gender": 1,
             "level": 110,
             "achievementPoints": 8040,
             "thumbnail": "gnomeregan/114/96531826-avatar.jpg",
             "spec": {
                 "name": "Mistweaver",
                 "role": "HEALING",
                 "backgroundImage": "bg-monk-battledancer",
                 "icon": "spell_monk_windwalker_spec",
                 "description": "A martial artist without peer who pummels foes with hands and fists.",
                 "order": 2
             },
             "guild": "Over Raided",
             "guildRealm": "Draenor",
             "lastModified": 0
         },
         "rank": 6
     }, {
         "character": {
             "name": "Yurtz",
             "realm": "Draenor",
             "battlegroup": "Embuscade / Hinterhalt",
             "class": 6,
             "race": 2,
             "gender": 0,
             "level": 110,
             "achievementPoints": 9220,
             "thumbnail": "gnomeregan/22/103898646-avatar.jpg",
             "spec": {
                 "name": "Frost",
                 "role": "DPS",
                 "backgroundImage": "bg-deathknight-frost",
                 "icon": "spell_deathknight_frostpresence",
                 "description": "An icy harbinger of doom, channeling runic power and delivering vicious weapon strikes.",
                 "order": 1
             },
             "guild": "Over Raided",
             "guildRealm": "Draenor",
             "lastModified": 0
         },
         "rank": 6
     }, {
         "character": {
             "name": "Ragefangz",
             "realm": "Draenor",
             "battlegroup": "Embuscade / Hinterhalt",
             "class": 11,
             "race": 8,
             "gender": 0,
             "level": 110,
             "achievementPoints": 19135,
             "thumbnail": "gnomeregan/41/104001833-avatar.jpg",
             "spec": {
                 "name": "Feral",
                 "role": "DPS",
                 "backgroundImage": "bg-druid-cat",
                 "icon": "ability_druid_catform",
                 "description": "Takes on the form of a great cat to deal damage with bleeds and bites.",
                 "order": 1
             },
             "guild": "Over Raided",
             "guildRealm": "Draenor",
             "lastModified": 0
         },
         "rank": 6
     }, {
         "character": {
             "name": "Evius",
             "realm": "Draenor",
             "battlegroup": "Embuscade / Hinterhalt",
             "class": 2,
             "race": 10,
             "gender": 0,
             "level": 110,
             "achievementPoints": 9220,
             "thumbnail": "gnomeregan/203/104008139-avatar.jpg",
             "spec": {
                 "name": "Holy",
                 "role": "HEALING",
                 "backgroundImage": "bg-paladin-holy",
                 "icon": "spell_holy_holybolt",
                 "description": "Invokes the power of the Light to protect and to heal.",
                 "order": 0
             },
             "guild": "Over Raided",
             "guildRealm": "Draenor",
             "lastModified": 0
         },
         "rank": 0
     }, {
       "character": {
           "name": "Q",
           "realm": "Draenor",
           "battlegroup": "Embuscade / Hinterhalt",
           "class": 4,
           "race": 5,
           "gender": 1,
           "level": 110,
           "achievementPoints": 55,
           "thumbnail": "gnomeregan/22/104027414-avatar.jpg",
           "spec": {
               "name": "Subtlety",
               "role": "DPS",
               "backgroundImage": "bg-rogue-subtlety",
               "icon": "ability_stealth",
               "description": "A dark stalker who leaps from the shadows to ambush his unsuspecting prey.",
               "order": 2
           },
           "guild": "Over Raided",
           "guildRealm": "Draenor",
           "lastModified": 0
       },
       "rank": 7
     }, {
         "character": {
             "name": "Ashke",
             "realm": "Draenor",
             "battlegroup": "Embuscade / Hinterhalt",
             "class": 4,
             "race": 5,
             "gender": 1,
             "level": 110,
             "achievementPoints": 55,
             "thumbnail": "gnomeregan/22/104027414-avatar.jpg",
             "spec": {
                 "name": "Subtlety",
                 "role": "DPS",
                 "backgroundImage": "bg-rogue-subtlety",
                 "icon": "ability_stealth",
                 "description": "A dark stalker who leaps from the shadows to ambush his unsuspecting prey.",
                 "order": 2
             },
             "guild": "Over Raided",
             "guildRealm": "Draenor",
             "lastModified": 0
         },
         "rank": 7
     }, {
         "character": {
             "name": "Omgduke",
             "realm": "Draenor",
             "battlegroup": "Embuscade / Hinterhalt",
             "class": 2,
             "race": 10,
             "gender": 0,
             "level": 110,
             "achievementPoints": 8940,
             "thumbnail": "gnomeregan/238/104048110-avatar.jpg",
             "spec": {
                 "name": "Protection",
                 "role": "TANK",
                 "backgroundImage": "bg-paladin-protection",
                 "icon": "ability_paladin_shieldofthetemplar",
                 "description": "Uses Holy magic to shield himself and defend allies from attackers.",
                 "order": 1
             },
             "guild": "Over Raided",
             "guildRealm": "Draenor",
             "lastModified": 0
         },
         "rank": 1
     }, {
         "character": {
             "name": "Mentathiel",
             "realm": "Draenor",
             "battlegroup": "Embuscade / Hinterhalt",
             "class": 11,
             "race": 8,
             "gender": 1,
             "level": 110,
             "achievementPoints": 8040,
             "thumbnail": "gnomeregan/152/104055704-avatar.jpg",
             "spec": {
                 "name": "Guardian",
                 "role": "TANK",
                 "backgroundImage": "bg-druid-bear",
                 "icon": "ability_racial_bearform",
                 "description": "Takes on the form of a mighty bear to absorb damage and protect allies.",
                 "order": 2
             },
             "guild": "Over Raided",
             "guildRealm": "Draenor",
             "lastModified": 0
         },
         "rank": 1
     }, {
         "character": {
             "name": "Dkisoriginal",
             "realm": "Draenor",
             "battlegroup": "Embuscade / Hinterhalt",
             "class": 6,
             "race": 10,
             "gender": 0,
             "level": 110,
             "achievementPoints": 8280,
             "thumbnail": "gnomeregan/219/104056027-avatar.jpg",
             "spec": {
                 "name": "Frost",
                 "role": "DPS",
                 "backgroundImage": "bg-deathknight-frost",
                 "icon": "spell_deathknight_frostpresence",
                 "description": "An icy harbinger of doom, channeling runic power and delivering vicious weapon strikes.",
                 "order": 1
             },
             "guild": "Over Raided",
             "guildRealm": "Draenor",
             "lastModified": 0
         },
         "rank": 6
     }, {
         "character": {
             "name": "Typikillyou",
             "realm": "Draenor",
             "battlegroup": "Embuscade / Hinterhalt",
             "class": 3,
             "race": 9,
             "gender": 0,
             "level": 110,
             "achievementPoints": 8275,
             "thumbnail": "gnomeregan/181/104059061-avatar.jpg",
             "spec": {
                 "name": "Marksmanship",
                 "role": "DPS",
                 "backgroundImage": "bg-hunter-marksman",
                 "icon": "ability_hunter_focusedaim",
                 "description": "A master archer or sharpshooter who excels in bringing down enemies from afar.",
                 "order": 1
             },
             "guild": "Over Raided",
             "guildRealm": "Draenor",
             "lastModified": 0
         },
         "rank": 3
     }, {
         "character": {
             "name": "Macarius",
             "realm": "Draenor",
             "battlegroup": "Embuscade / Hinterhalt",
             "class": 5,
             "race": 5,
             "gender": 0,
             "level": 110,
             "achievementPoints": 9220,
             "thumbnail": "gnomeregan/8/104114952-avatar.jpg",
             "spec": {
                 "name": "Shadow",
                 "role": "DPS",
                 "backgroundImage": "bg-priest-shadow",
                 "icon": "spell_shadow_shadowwordpain",
                 "description": "Uses sinister Shadow magic, especially damage-over-time spells, to eradicate enemies.",
                 "order": 2
             },
             "guild": "Over Raided",
             "guildRealm": "Draenor",
             "lastModified": 0
         },
         "rank": 6
       }, {
           "character": {
               "name": "S",
               "realm": "Draenor",
               "battlegroup": "Embuscade / Hinterhalt",
               "class": 5,
               "race": 5,
               "gender": 0,
               "level": 99,
               "achievementPoints": 9220,
               "thumbnail": "gnomeregan/8/104114952-avatar.jpg",
               "spec": {
                   "name": "Shadow",
                   "role": "DPS",
                   "backgroundImage": "bg-priest-shadow",
                   "icon": "spell_shadow_shadowwordpain",
                   "description": "Uses sinister Shadow magic, especially damage-over-time spells, to eradicate enemies.",
                   "order": 2
               },
               "guild": "Over Raided",
               "guildRealm": "Draenor",
               "lastModified": 0
           },
           "rank": 6
         }]};

   });
