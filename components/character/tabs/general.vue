<template>
    <div class="tab character" data-group="primary" data-tab="character">
    <section class="character-details">
        <div class="frame-container">
            <div class="frame image-container">
                <!-- <img class="actor-image" alt="{{actor.name}}" src="{{actor.img}}" title="{{actor.name}}" data-edit="img" /> -->
                <a class="hover-icon" data-action="show-image"><i class="fas fa-image fa-fw"></i></a>
            </div>
        </div>
        <div class="alignment">
            <span class="bio-alignment" title= "PF2E.AlignmentTitle">
                <!-- <select aria-label="{{localize "PF2E.Alignment"}}" name="system.details.alignment.value">
                    {{#select data.details.alignment.value}}
                        {{#each alignments as |label key|}}
                            <option value="{{key}}">{{localize label}}</option>
                        {{/each}}
                    {{/select}}
                </select> -->
            </span>
        </div>
        <div class="pc pc_deity item">
            <div class="input">
              
            </div>
            
        </div>
        <div class="detail-sheet">
            <div class="pc pc_ancestry item">
               
            </div>
            <div class="pc pc_heritage item">
              
            </div>
            <div class="pc pc_class item">
              
            </div>
            <div class="pc pc_background item">
             
            </div>
        </div>
    </section>

    <hr />
    <section class="character-background">
      jhuhu
    </section>

    <hr />
    <section class="character-traits">
        huhuhu
    </section>

    <h3 class="header">
     <button type="button" data-action="edit-ability-scores">
     <i class="fas fa-fw fa-edit"></i>
     </button>
     </h3>
    <section class="character-abilities">
       
    </section>
</div>
</template>
<script lang="scss"></script>
